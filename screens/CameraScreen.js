import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Camera} from "expo-camera";
import {View, StyleSheet} from "react-native";
import {Text, Icon, Button, Toast} from "native-base";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen({navigation, route}) {
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [hasMediaPermission, setHasMediaPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [isCameraReady, setCameraReady] = useState(null);

	useEffect(() => {
		(async () => {
			const {status} = await Camera.requestPermissionsAsync();
			const mediaPermissions = await MediaLibrary.requestPermissionsAsync();
			setHasCameraPermission(status === "granted");
			setHasMediaPermission(mediaPermissions.status === "granted");
		})();

		return setCameraRef(null);
	}, []);

	const takePicture = async () => {
		if (isCameraReady) {
			let asset;
			try {
				const {uri} = await cameraRef.takePictureAsync();
				asset = await MediaLibrary.createAssetAsync(uri);
			} catch (e) {
				Toast.show({
					text: e.errors,
					buttonText: "Okay",
					type: "warning",
					duration: 10000000,
				});
			} finally {
				route.params.isEdit
					? navigation.goBack()
					: navigation.navigate("Add Book", {uri: asset.uri});
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
				ref={(ref) => setCameraRef(ref)}
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
}

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

CameraScreen.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object,
};
