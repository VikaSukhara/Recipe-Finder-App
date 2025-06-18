import { FadeLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <FadeLoader
        color="#1e40af"
        height={30}
        width={10}
        radius={5}
        margin={8}
      />
    </div>
  );
}
