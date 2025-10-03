import { useParams } from "react-router-dom";
import TopicForm from "../components/form/CreateTopicForm.jsx";

export default function CreateTopicPage() {
  const { subjectId } = useParams(); // selectedSubject

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Create Topic</h1>
      <TopicForm subjectId={subjectId} />
    </div>
  );
}
