import AuthButton from "../components/AuthButton";

import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";

export default async function Index() {
  return (
    <Background>
      <div className="flex-1 w-full flex flex-col md:gap-20 items-center pt-40 md:pt-0 md:px-14">
        <Navbar />
      </div>
      <Search />
      {/* <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div> */}
    </Background>
  );
}
