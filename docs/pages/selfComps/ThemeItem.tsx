import { Theme } from "rua-components/src/types/theme.ts";
function ThemeItem({ theme }: { theme: Theme }) {
  return (
    <>
      <div
        data-theme={theme}
        //* 只有一行高，必须使用flex 使他们不换行
        className="size-full rounded-btn text-base-c bg-base-300 flex items-center justify-between px-2"
      >
        {/* set flex when active */}
        <div className="w-4 h-4 hidden place-content-center text-success">
          <Selected />
        </div>
        {theme}
        <div className=" flex gap-1 items-center">
          <span className="w-2  h-4 bg-primary rounded-badge"></span>
          <span className="w-2  h-4 bg-secondary rounded-badge"></span>
          <span className="w-2  h-4 bg-accent rounded-badge"></span>
        </div>
      </div>
    </>
  );
}

export default ThemeItem;

function Selected() {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4288"
      width="16"
      height="16"
    >
      <path
        d="M60.217477 633.910561c0 0 250.197342 104.557334 374.563838 330.628186 149.378146-279.762705 436.109566-540.713972 521.05012-560.013527 0-115.776863 0-163.394371 0-341.442486-342.237595 226.070852-506.576477 642.342604-506.576477 642.342604l-180.049702-191.614086L60.217477 633.910561z"
        fill="currentColor"
        p-id="4289"
      ></path>
    </svg>
  );
}
