import { Dela_Gothic_One } from "next/font/google";
import localFont from "next/font/local";

export const delaFont = Dela_Gothic_One({
    weight: ["400"],
    subsets: ["latin"]
});

export const neueFont = localFont({
    src: "/NeueMachina-Regular.otf"
})