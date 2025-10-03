export default function WinOverlay({ message }: { message?: string }) {

  let textColor = "text-white";

  if (message === "Congratulations, You Calmed Your Therapist Down!") {
    textColor = "text-green-500";
  } else if (message === "Congratulations, You Drove Your Therapist Crazy!") {
    textColor = "text-red-500";
  }

  return (
    <div>
      <div className="bg-black opacity-60 rounded absolute inset-0">
      </div>
      <h1 className={`${textColor} opacity-85 text-5xl font-bold drop-shadow-lg absolute inset-0 flex items-center justify-center pl-5`}>
        {message}
      </h1>
    </div>
  );
}
