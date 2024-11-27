const createStudent = async (req: Request, res: Response) => {
  const student = req.body;
  // data validation using joi
  const { error, value } = studentValidationSchema.validate(student, {
    abortEarly: false,
  });

  if (error) {
    console.log(error);
    res
      .json({
        message: 'Schema validation failed',
        error: error.details.map((err) => err.message),
      })
      .status(500);
  }
  try {
    const result = await createStudentIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'User inserted into the database successfully.',
      data: result,
    });
  } catch (error: any) {
    // console.log(error);
    console.log('Some error happened');
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
export const UserControllers = {};
