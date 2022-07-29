import RichTextWithOptionalPhoto from "../RichTextWithOptionalPhoto";

export default function Person(props) {
    return <RichTextWithOptionalPhoto title={props.name} image={props.image} description={props.bio} />
}