import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { View, StyleSheet } from "react-native";
import { Text, Icon, Button, Toast } from "native-base";
import * as MediaLibrary from "expo-media-library";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";

import { StackParamList } from "./HomeScreen";

interface Props {
	navigation: StackNavigationHelpers;
	route: RouteProp<StackParamList, "Camera">;
}

const CameraScreen: React.FC<Props> = ({ navigation, route }) => {
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [hasMediaPermission, setHasMediaPermission] = useState(false);
	const [cameraRef, setCameraRef] = useState<Camera | null>(null);
	const [isCameraReady, setCameraReady] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			const mediaPermissions = await MediaLibrary.requestPermissionsAsync();
			setHasCameraPermission(status === "granted");
			setHasMediaPermission(mediaPermissions.status === "granted");
		})();

		return () => {
			setCameraRef(null);
		};
	}, []);

	const takePicture = async () => {
		if (isCameraReady) {
			let asset;

			try {
				const { uri } = await (cameraRef as Camera).takePictureAsync();
				asset = await MediaLibrary.createAssetAsync(uri);
			} catch (e) {
				Toast.show({
					text: e.errors,
					buttonText: "Okay",
					type: "warning",
					duration: 10000000,
				});
			} finally {
				route.params.isEdit || !asset
					? navigation.goBack()
					: navigation.navigate("Add Book", { uri: asset.uri });
			}
		}
	};

	switch (true) {
		case hasCameraPermission === null || hasMediaPermission == null:
			return <View />;
		case hasCameraPermission === false:
			return <Text>No access to camera</Text>;
		case hasMediaPermission === false:
			return <Text>No access to phone storage</Text>;
		default:
			break;
	}

	return (
		<View style={styles.container}>
			<Camera
				style={styles.camera}
				type={Camera.Constants.Type.back}
				ref={(ref: any) => setCameraRef(ref)}
				ratio="4:3"
				pictureSize="640x480"
				onCameraReady={() => setCameraReady(true)}
			>
				<View style={styles.buttonContainer}>
					<Button
						light
						rounded
						style={styles.button}
						onPress={() => takePicture()}
					>
						<Icon type="AntDesign" name="camera" />
					</Button>
				</View>
			</Camera>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		marginBottom: 10,
	},
	buttonContainer: {
		alignItems: "flex-end",
		backgroundColor: "transparent",
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
	container: {
		height: "75%",
		width: "100%",
	},
});

export default CameraScreen;
