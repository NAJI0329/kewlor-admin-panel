import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Loading = (props: any) => {
    const loading = useSelector((state: RootState) => state.loading.isLoading);
    return (
        <>
            {loading &&
                <div className="w-full h-full dark:bg-white/30 bg-black/30 z-[10000] fixed left-0 top-0">
                    <img src="/img/loading-spinner.gif" className="absolute w-24 h-24 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" alt="Loading..." />
                </div>
            }
        </>
    );
}

export default Loading;