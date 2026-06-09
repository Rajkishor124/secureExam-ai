import { useState } from "react";
import Input from "../ui/Input";

function EditExamModal({
  exam,
  onClose,
  onSave,
}) {

  const [formData, setFormData] =
    useState({
      title: exam.title,
      description: exam.description,
      duration: exam.duration,
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  return (
    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      justify-center
      items-center
      z-50
    ">

      <div className="
        bg-slate-900
        p-8
        rounded-2xl
        w-125
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-6
        ">
          Edit Exam
        </h2>

        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="
            w-full
            p-3
            rounded
            mb-4
            text-white
          "
        />

        <Input
          type="textarea" 
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="
            w-full
            p-3
            rounded
            mb-4
            text-white
          "
        />

        <Input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="
            w-full
            p-3
            rounded
            mb-4
            text-white
          "
        />

        <div className="
          flex
          gap-4
        ">

          <button
            onClick={() =>
              onSave(formData)
            }
            className="
              bg-green-500
              px-5
              py-2
              rounded
            "
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="
              bg-red-500
              px-5
              py-2
              rounded
            "
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditExamModal;