import React, {useState} from "react";
import { Box, 
  Center, 
  Heading, 
  FormControl,
  FormControlLabel, 
  FormControlLabelText, 
  Input, 
  InputField,
  FormControlHelper,
  FormControlHelperText, 
  FormControlError,
  FormControlErrorIcon,
  AlertCircleIcon,
  FormControlErrorText,
  Select,
  SelectTrigger,
  SelectInput,
  ChevronDownIcon,
  Icon,
  SelectBackdrop,
  SelectPortal,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectContent,
  SelectIcon,
  Textarea,
  TextareaInput,
  Button,
  Image} from "@gluestack-ui/themed";
import {Text, Alert, TouchableOpacity} from "react-native";
import { sendFormData } from "../actions/AuthAction";
import { useNavigation } from "@react-navigation/native";


const Pkul = () => {

  const navigation = useNavigation();

  const [formValues, setFormValues] = useState({
    alamat: "",
    nomorTelpon: "",
    layanan: "",
    detailPesanan: "",
  });

  const handleInputChange = (fieldName, value) => {
    setFormValues({
      ...formValues,
      [fieldName]: value,
    });
  };

  const handleSelectChange = (value) => {
    setFormValues({
      ...formValues,
      layanan: value,
    });
  };

  const handleSubmission = async () => {
    // Validasi apakah semua field telah diisi
  if (!formValues.alamat || !formValues.nomorTelpon || !formValues.layanan || !formValues.detailPesanan) {
    Alert.alert(
      "Peringatan",
      "Tolong isi semua data pesanan terlebih dahulu.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
    return;
  }
    try {
      // Kirim data ke Firebase Realtime Database menggunakan fungsi baru
      await sendFormData(formValues);

      // Tampilkan pemberitahuan setelah mengklik tombol "Submit"
      Alert.alert(
        "Pemberitahuan",
        "Berikut No Whatsapp Kuli yang bisa dihubungi  'https://whatsapp.com/'  silahkan untuk melakukan transaksi langsu pada link whatsapp tersebut",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Center flex={0.6}>
        <Image
          size="xl"
          borderRadius="$none"
          source={require("../assets/promax.png")}
          alt="p"
          role="img"
        />

        <Box position="absolute" top="10" left="10">
          <TouchableOpacity onPress={() => navigation.navigate('layanan')}>
          <Image
            source={require("../assets/backIcon.png")}
            style={{ width: 34, height: 34, marginBottom:350, marginRight:300}}
            />
          </TouchableOpacity>
        </Box> 

        <Heading mb="$5">Panggilan Kuli</Heading>

        <Box h="$32" w="$72">
          <FormControl mb="$2" size="md" isRequired={true}>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Alamat</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="Alamat Pembangunan"
                value={formValues.alamat}
                onChangeText={(text) => handleInputChange("alamat", text)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon
                as={AlertCircleIcon}
              />
              <FormControlErrorText>
                Setidaknya inputkan minimal 6.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl mb="$5" size="md" isRequired={true}>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Nomor Telpon</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="Nomor Telpon pengguna"
                value={formValues.nomorTelpon}
                onChangeText={(text) => handleInputChange("nomorTelpon", text)}
                keyboardType="numeric"
              />
            </Input>
          </FormControl>

          <FormControl mb="$5" size="md" isRequired={true}>
            <FormControlLabel mb="$1">
              <FormControlLabelText>Pilih Layanan</FormControlLabelText>
            </FormControlLabel>
            <Select
              onValueChange={(value) => handleSelectChange(value)}
              value={formValues.layanan}
            >
              <SelectTrigger>
                <SelectInput placeholder="Pilih Layanan" />
                <SelectIcon mr="$3">
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>

              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="kuli Struktur" value="Kuli Struktur" />
                  <SelectItem label="kuli Rumah" value="Kuli Rumah" />
                  <SelectItem label="kuli Bangunan" value="Kuli Bangunan" />
                  <SelectItem label="kuli Proyek" value="Kuli Proyek" />
                  <SelectItem label="kuli Residential" value="Kuli Residential" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>

          <Text size={40}>Beri Detail Pesanan Layanan</Text>
          <FormControl mb="$5" size="md">
            <Textarea
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}
              w="$70"
            >
              <TextareaInput
                placeholder="Your text goes here..."
                value={formValues.detailPesanan}
                onChangeText={(text) => handleInputChange("detailPesanan", text)}
              />
            </Textarea>
          </FormControl>

          <Button
            colorScheme="primary"
            onPress={() => handleSubmission()}
            mt="$11"
          >
            <Text>Submit</Text>
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default Pkul;