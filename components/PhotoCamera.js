import React, {useState, useEffect} from "react";
import {Camera} from "expo-camera";
import {View, StyleSheet} from "react-native";
import {Text} from "native-base";
import {TouchableOpacity} from "react-native-gesture-handler";

export default function PhotoCamera() {
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [isCameraReady, setCameraReady] = useState(null);

	useEffect(() => {
		(async () => {
			const {status} = await Camera.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();

		return setCameraRef(null);
	}, []);

	const takePicture = () => {
		if (isCameraReady) {
			cameraRef
				.takePictureAsync()
				.then((data) => console.log(data))
				.catch((e) => console.log(e));
		}
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
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
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => takePicture()}
					>
						<Text style={styles.buttonText}>Photo</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: "flex-end",
		backgroundColor: "transparent",
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		marginBottom: 10,
	},
	camera: {
		flex: 1,
	},
	container: {
		height: "75%",
		width: "100%",
	},
});
