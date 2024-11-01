import facecam from '../assets/img/facecam.jpg';
export default function FaceCam() {
  return (
    <div className="w-full aspect-square bg-slate-700">
      <img src={facecam} alt="facecam" className="w-full" />
    </div>
  );
}
