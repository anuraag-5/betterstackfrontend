import localFont from "next/font/local";
import { Dela_Gothic_One, Poppins, Kapakana } from "next/font/google";

export const delaFont = Dela_Gothic_One({
    weight: ["400"],
    subsets: ["latin"]
});

export const neueFont = localFont({
    src: "/NeueMachina-Regular.otf"
})

export const poppinsFont = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
})

export const kapakanaFont = Kapakana({
    weight: ["300", "400"],
    subsets: ["latin"]
})