import { StarIcon } from "@chakra-ui/icons";

const Star = ({ rating = 0, star = 0 }) => (
  <StarIcon color={rating >= star || rating === 0 ? "#EE3536" : "gray.200"} />
);

export default Star;
