import { getSession } from 'next-auth/client';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { surveyId, answers } = req.body;

  const session = await getSession({ req });
  // const body = { surveyId: id, answers: answerState };

  const result = await prisma.submission.create({
    data: {
      answers,
      survey: { connect: { id: parseInt(surveyId) } },
    },
  });
  res.json(result);
}
