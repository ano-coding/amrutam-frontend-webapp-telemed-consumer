import { useMutation } from "@tanstack/react-query";
import { updatePatientProfile } from "../services/apiPatient";

const useUpdatePatientProfile = () => {
  const {
    mutate: updatePatientProfileMutate,
    status: updatePatientProfileStatus,
  } = useMutation({
    mutationFn: ({
      token,
      email,
      firstName,
      lastName,
      phone,
      state,
      country,
      heightUnit,
      heightValue,
      dob,
      weightUnit,
      weightValue,
      bio,
      gender,
      timezone,
      photo,
      sleepPattern,
    }) =>
      updatePatientProfile(
        token,
        email,
        firstName,
        lastName,
        phone,
        state,
        country,
        heightUnit,
        heightValue,
        dob,
        weightUnit,
        weightValue,
        bio,
        gender,
        timezone,
        photo,
        sleepPattern,
      ),
  });

  return {
    updatePatientProfileMutate,
    updatePatientProfileStatus,
  };
};

export default useUpdatePatientProfile;
