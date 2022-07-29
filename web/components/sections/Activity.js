import RichTextWithOptionalPhoto from "../RichTextWithOptionalPhoto";

export default function Activity(props) {
  return <RichTextWithOptionalPhoto {...props} title={props.name} />;
}
