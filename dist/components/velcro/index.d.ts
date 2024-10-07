import Component from '@glimmer/component';
import VelcroModifier from "../../modifiers/velcro.js";
import { Signature as ModifierSignature } from "../../modifiers/velcro.js";
import { MiddlewareArguments } from '@floating-ui/dom';
import { ModifierLike } from '@glint/template';
type ModifierArgs = ModifierSignature['Args']['Named'];
interface Signature {
    Args: {
        middleware?: ModifierArgs['middleware'];
        placement?: ModifierArgs['placement'];
        strategy?: ModifierArgs['strategy'];
        flipOptions?: ModifierArgs['flipOptions'];
        hideOptions?: ModifierArgs['hideOptions'];
        shiftOptions?: ModifierArgs['shiftOptions'];
        offsetOptions?: ModifierArgs['offsetOptions'];
    };
    Blocks: {
        default: [
            velcro: {
                hook: ModifierLike<HookSignature>;
                setHook: (element: HTMLElement | SVGElement) => void;
                loop: ModifierLike<{
                    Element: HTMLElement;
                }>;
                data: MiddlewareArguments;
            }
        ];
    };
}
interface HookSignature {
    Element: HTMLElement | SVGElement;
}
declare class Velcro extends Component<Signature> {
    hook?: HTMLElement | SVGElement;
    velcroData?: MiddlewareArguments;
    setVelcroData: any;
    setHook: (element: HTMLElement | SVGElement) => void;
    velcroHook: import("ember-modifier/.").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: HookSignature;
    }>;
    velcroLoop: typeof VelcroModifier;
}
export { Velcro as default };
//# sourceMappingURL=components/velcro/index.d.ts.map