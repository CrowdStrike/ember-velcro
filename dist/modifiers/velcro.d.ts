import Modifier from 'ember-modifier';
import { FlipOptions, HideOptions, Middleware, OffsetOptions, Placement, ShiftOptions, Strategy } from '@floating-ui/dom';
interface Signature {
    Element: HTMLElement;
    Args: {
        Positional: [referenceElement: string | HTMLElement | SVGElement];
        Named: {
            strategy?: Strategy;
            offsetOptions?: OffsetOptions;
            placement?: Placement;
            flipOptions?: FlipOptions;
            shiftOptions?: ShiftOptions;
            hideOptions?: HideOptions;
            middleware?: Middleware[];
            setVelcroData?: Middleware['fn'];
        };
    };
}
declare class VelcroModifier extends Modifier<Signature> {
    modify(floatingElement: Signature['Element'], [_referenceElement]: Signature['Args']['Positional'], { strategy, offsetOptions, placement, flipOptions, shiftOptions, middleware, setVelcroData, }: Signature['Args']['Named']): void;
}
export { Signature, VelcroModifier as default };
//# sourceMappingURL=modifiers/velcro.d.ts.map