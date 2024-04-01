import { axiosClient } from "./index";

export const getCountries = ({
  limit = 5,
  namePrefix = "",
  currentOffset = 1,
}) => {
  return axiosClient.get(
    "/cities?limit=" +
      limit +
      "&currentOffset=" +
      currentOffset +
      "&namePrefix=" +
      namePrefix
  );
};
