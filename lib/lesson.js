import axios from "axios";

const addLesssonToDb = async (values, slug) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/${slug}`,
    values
  );
};

const uploadVideoToDb = async (videoData) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-video`,
    videoData,
    {
      onUploadProgress: (e) => {
        setProgress(Math.round((100 * e.loaded) / e.total));
      },
    }
  );
};

const removeLessonFromDb = async (slug, remove) => {
  console.log(remove);
  if (remove[0]._id) {
    return await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${slug}/lesson/${remove[0]._id}`
    );
  }
  return;
};

const updateLessonInDb = async (slug, updated) => {
  if (updated._id) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${slug}/lesson/${updated._id}`,
      updated
    );
  }
  return;
};

export {
  addLesssonToDb,
  uploadVideoToDb,
  removeLessonFromDb,
  updateLessonInDb,
};
