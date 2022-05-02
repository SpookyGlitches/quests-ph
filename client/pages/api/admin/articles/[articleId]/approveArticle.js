import prisma from "../../../../../lib/prisma";
import maybeAwardUserForArticle from "../../../../../helpers/badges/acceptedArticles";

export default async function approveArticle(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const transactions = [];
    const approvedArticle = await prisma.article.update({
      where: {
        articleId: Number(req.query.articleId),
      },
      data: {
        status: "APPROVED",
        approvedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const approvedData = {
      userId: approvedArticle.userId,
      message: "Submitted article approved!",
      type: "APPROVED_ARTICLE",
      metadata: JSON.stringify({ articleId: approvedArticle.articleId }),
    };

    if (approvedArticle) {
      const approvedNotification = prisma.Notification.create({
        data: approvedData,
      });
      transactions.push(approvedNotification);
    }

    const { updateUserCurrency, insertUserBadgeData, insertNotificationData } =
      await maybeAwardUserForArticle(approvedArticle.userId);

    const updateUserCurrencyOperation = prisma.userCurrency.update({
      where: updateUserCurrency.where,
      data: updateUserCurrency.data,
    });
    transactions.push(updateUserCurrencyOperation);

    if (insertUserBadgeData && insertNotificationData) {
      const insertUserBadgeOperation = prisma.userBadge.create({
        data: insertUserBadgeData,
      });

      const insertNotificationOperation = prisma.notification.create({
        data: insertNotificationData,
      });

      transactions.push(insertUserBadgeOperation);
      transactions.push(insertNotificationOperation);
    }

    await prisma.$transaction(transactions);
    return res.status(200).json(approvedArticle);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
