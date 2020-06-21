import { trigger, state, style, transition, animate, group } from "@angular/animations";
import { getStylesFromClasses } from "./animationUtils";

const commonStyles = {
    border: "black solid 4px",
    color: "white"
};

export const HighlightTrigger = trigger("rowHighlight", [
    state("selected", style(getStylesFromClasses(["bg-success", "h2"]))),
    state("notselected", style(getStylesFromClasses("bg-info"))),
    state("void", style({
        transform: "translateX(-50%)"
    })),
    transition("* => notselected", animate("200ms")),
    transition("* => selected",  animate("400ms 200ms ease-in")),
    transition("void => *", animate("500ms"))
]);