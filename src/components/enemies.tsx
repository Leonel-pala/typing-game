export default function Enemies(word: String, wordRefIsActive: boolean) {
  return (
    <div
      ref={wordSelect == wordActive ? wordRefActive : null}
      className={
        'text-6xl w-max relative p-3 m-auto border-2 border-red-200 text-[#ffffff62] flex  ' +
        (wordSelect == wordActive
          ? clsx({
              'border-red-500':
                wordSelect != type && type.length == wordSelect.length,
              'shadow-active ': wordSelect == wordActive,
            })
          : '')
      }
    ></div>
  );
}
