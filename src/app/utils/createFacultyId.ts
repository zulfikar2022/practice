import { Faculty } from '../modules/faculty/faculty.model';

const createFacultyId = async () => {
  try {
    const numberOfFaculties = await Faculty.countDocuments();
    const numberId = (numberOfFaculties + 1).toString().padStart(4, '0');
    return `F-${numberId}`;
  } catch (error) {
    throw error;
  }
};

export default createFacultyId;
