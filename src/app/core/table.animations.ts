import { trigger, state, style, transition, animate } from "@angular/animations";

export const HighlightTrigger = trigger("rowHighlight", [
    state("selected", style({
        backgroundColor: "lightgreen",
        fontSize: "20px"
    })),
    state("notselected", style({
        backgroundColor: "lightsalmon",
        fontSize: "12px"
    })),
    state("*", style({
        border: "solid black 2px"
    })),
    transition("selected => notselected", animate("200ms")),
    transition("notselected => selected", animate("400ms"))
]);