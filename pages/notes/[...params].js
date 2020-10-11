import { useRouter } from "next/router";

export default function Notes() {
  const router = useRouter();
  const { params } = router.query;

  console.log(params);

  return <div>hola dos </div>;
}
