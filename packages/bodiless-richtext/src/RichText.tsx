import EditableRichText from "./EditableRichText";
import StaticRichText from "./StaticRichText";

const RichText = process.env.NODE_ENV === 'production' ? StaticRichText : EditableRichText;
export default RichText;
