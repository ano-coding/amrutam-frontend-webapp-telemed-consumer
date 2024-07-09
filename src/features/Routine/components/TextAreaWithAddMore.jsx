import SimpleTextArea from "./SimpleTextArea";
import AddMoreButton from "./AddMoreButton";

const TextAreaWithAddMore = ({ label }) => {
  return (
    <div className="flex w-full flex-col items-end gap-3 md:w-fit lg:mr-16">
      <SimpleTextArea label={label} rows={4} mdWidth={400} />
      <AddMoreButton />
    </div>
  );
};

export default TextAreaWithAddMore;
