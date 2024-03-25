import Modifier from 'ember-modifier';
import { Middleware, Placement, Strategy } from '@floating-ui/dom';
/**
 * TODO: figure out how to get the real types out of @floating-ui/dom
 */
type TODO = any;
interface Signature {
    Element: HTMLElement;
    Args: {
        Positional: [referenceElement: string | HTMLElement | SVGElement];
        Named: {
            strategy?: Strategy;
            offsetOptions?: TODO;
            placement?: Placement;
            flipOptions?: TODO;
            shiftOptions?: TODO;
            hideOptions?: TODO;
            middleware?: Middleware[];
            setVelcroData?: Middleware['fn'];
        };
    };
}
declare class VelcroModifier extends Modifier<Signature> {
    modify(floatingElement: Signature['Element'], [_referenceElement]: Signature['Args']['Positional'], { strategy, offsetOptions, placement, flipOptions, shiftOptions, middleware, setVelcroData, }: Signature['Args']['Named']): void;
}
export { Signature, VelcroModifier as default };
