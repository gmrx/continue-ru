import { useAppSelector } from "../redux/hooks";
import { selectSelectedChatModel } from "../redux/slices/configSlice";
import { LanguageSelector } from "./LanguageSelector";

function Footer() {
  const defaultModel = useAppSelector(selectSelectedChatModel);

  // TODO hook hub up to free trial
  // if (defaultModel?.provider === "free-trial") {
  //   return (
  //     <footer className="flex flex-col border-0 border-t border-solid border-t-zinc-700 px-2 py-2">
  //       <FreeTrialProgressBar
  //         completed={getLocalStorage("ftc") ?? 0}
  //         total={FREE_TRIAL_LIMIT_REQUESTS}
  //       />
  //     </footer>
  //   );
  // }

  return (
    <footer className="flex flex-row items-center justify-between border-0 border-t border-solid border-t-zinc-700 px-2 py-1">
      <div className="flex-1"></div>
      <LanguageSelector className="text-xs" />
    </footer>
  );
}

export default Footer;
