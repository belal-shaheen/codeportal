import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const submissionId = req.query.id;
    if (req.method === 'DELETE') {
      const submission = await prisma.submission.delete({
        where: { id: Number(submissionId) },
      });
      res.json(submission);
    } else {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      );
    }
  }
  