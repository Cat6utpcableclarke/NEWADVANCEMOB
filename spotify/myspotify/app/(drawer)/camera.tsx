import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Directory, File, Paths } from 'expo-file-system';
import * as ImageManipulator from "expo-image-manipulator";
import { useRef, useState } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


const Camera: React.FC = () => {
  const [facingMode, setFacingMode] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [filter, setFilter] = useState<"none" | "grayscale" | "sepia">("none");

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Pagamita ko</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacingMode((current) => (current === "back" ? "front" : "back"));
  }
    async function savePhotoLocally(uri: string) {
    // Create a File for the *source* too
    const sourceFile = new File(uri);                // <-- File, not string
    const targetDir = new Directory(Paths.document);
    const destFile = new File(targetDir, 'edited-photo.png');
    await destFile.create({ overwrite: true });
    await sourceFile.copy(destFile);                 // File → File
    console.log('Saved at:', destFile.uri);
    }
  async function handleCrop() {
    if (photoUri) {
      const result = await ImageManipulator.manipulateAsync(
        photoUri,
        [{ crop: { originX: 0, originY: 0, width: 100, height: 100 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setPhotoUri(result.uri);
    }
  }
  async function handleRotate() {
    if (photoUri) {
      const result = await ImageManipulator.manipulateAsync(
        photoUri,
        [{ rotate: 90 }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setPhotoUri(result.uri);
    }
  }
  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      await savePhotoLocally(photo.uri);
      console.log(photo);
    }
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFilter("none")}
        >
          <Text style={styles.text}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFilter("grayscale")}
        >
          <Text style={styles.text}>Grayscale</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFilter("sepia")}
        >
          <Text style={styles.text}>Sepia</Text>
        </TouchableOpacity>
      </View>
      {photoUri ? (
        <View>
          <Image
            source={{ uri: photoUri }}
            style={{ width: 200, height: 200 }}
          />
          <Button title="Crop" onPress={handleCrop} />
          <Button title="Rotate" onPress={handleRotate} />
        </View>
      ) : null}
      <CameraView ref={cameraRef} style={styles.camera} facing={facingMode} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    marginBottom: 64,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 32,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 32,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1DB954",
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
});
