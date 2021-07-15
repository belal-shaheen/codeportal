import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const surveyId = req.query.id;
    if (req.method === 'DELETE') {
      const survey = await prisma.survey.delete({
        where: { id: Number(surveyId) },
      });
      res.json(survey);
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
    }
  }
  