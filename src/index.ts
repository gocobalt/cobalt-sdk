import { Base } from "./base";
import { Apis } from "./Apis";
import { applyMixins } from "./utils";

class Breakout extends Base {}
interface Breakout extends Apis {}

applyMixins(Breakout, [Apis]);

export default Breakout;