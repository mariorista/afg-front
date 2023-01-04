import { useRouter } from "next/router";

const ShouldBePaired = () => {
  const router = useRouter();
  const { shouldBePaired } = router.query;
  return <div>ShouldBePaired: {shouldBePaired}</div>;
};

export default ShouldBePaired;
