import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import dashboardImage from '../../assets/dashboard_image.png'
import subjectsPageImage from '../../assets/subjectsPageImage.png'
import createTopicFormImage from '../../assets/TopicForm.png'
import aiGeneratedPractice from '../../assets/aiGeneratedPractice.png'
import topicContentPageImage from '../../assets/topicContentPageImage.png'
import studyRevisionImage from '../../assets/studyRevisionImage.png'

export default function ShowcaseSlider() {
  const showcaseItems = [
  {
    title: "Dashboard Overview",
    description:
      "Get a complete view of your subjects and progress in one place. The dashboard gives quick access to everything — notes, topics, and learning stats.",
    image: dashboardImage, // Your dashboard screenshot here
  },
  {
    title: "Subjects & Topics",
    description:
      "Organize your learning by subjects. Each subject contains structured topics that help you focus and manage your study material easily.",
    image: subjectsPageImage, // Screenshot of subjects or topics list
  },
  {
    title: "Create New Topic",
    description:
      "Easily create new topics with our AI-assisted topic generator or manually craft your own content with rich text, images, and code blocks.",
    image: createTopicFormImage, // Screenshot of topic creation form
  },
  
  {
    title: "Interactive Topic View",
    description:
      "View each topic in an organized layout showing all content types — text, formulas, code, tables, and images — all in one place.",
    image: topicContentPageImage, // Screenshot of topic content page
  },
  {
    title: "AI-Generated Practice",
    description:
      "Let AI automatically generate topic content — including flashcards, quizzes, and practice questions with adjustable difficulty — to help you learn faster and understand concepts deeply.",
    image: aiGeneratedPractice, // Screenshot of topic after AI generation
  },
  {
    title: "Study and Revise",
    description:
      "Revise your topics using flashcards, summaries, and AI assistance for a complete, engaging learning experience.",
    image: studyRevisionImage, // Screenshot showing flashcards or summaries
  },
];



  const [sliderRef] = useKeenSlider({
    loop: true,
    drag: true,
    renderMode: "performance",
    slides: {
      perView: 1,
    },
    created(slider) {
      let timeout;
      const autoplay = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => slider.next(), 4000);
      };
      slider.on("created", autoplay);
      slider.on("dragStarted", () => clearTimeout(timeout));
      slider.on("animationEnded", autoplay);
      slider.on("updated", autoplay);
    },
  });

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] xl:h-screen bg-gray-900">
  <div ref={sliderRef} className="keen-slider h-full">
    {showcaseItems.map((item, index) => (
      <div key={index} className="keen-slider__slide relative h-full w-full">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-contain brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center px-6 md:px-0 max-w-3xl">
          <h2 className="text-3xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            {item.title}
          </h2>
          <p className="text-base md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            {item.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

  );
}