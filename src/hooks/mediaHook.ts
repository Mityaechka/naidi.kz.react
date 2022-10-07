import {useMediaPredicate} from "react-media-hook";

export const useMedia = () => {
    const isMobile = useMediaPredicate("(max-width: 480px)");
    const isTablet = useMediaPredicate("(min-width: 480px) and (max-width: 1024px)");
    const isDesktop = useMediaPredicate("(min-width: 1024px)");

    return {
        isMobile,
        isTablet,
        isDesktop
    }
}