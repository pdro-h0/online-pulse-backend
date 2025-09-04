/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Se inscrever em um evento
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - referrer
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               referrer:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Inscrição feita com sucesso
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                subscriberId:
 *                  type: string
 * 
 * @swagger
 * /invites/{subscriberId}:
 *   get:
 *     summary: Acessar link de convite
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Link acessado e usuario redirecionado com sucesso
 * 
 * @swagger
 * /subscribers/{subscriberId}/ranking/position:
 *   get: 
 *     summary: Obter posição do usuario no ranking
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posição do usuario no ranking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 position:
 *                   type: number
 *                   nullable: true
 * 
 * @swagger
 * /subscribers/{subscriberId}/ranking/count:
 *   get: 
 *     summary: Obter quantidade de convites do usuario
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantidade de convites do usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 * 
 * @swagger
 * /subscribers/{subscriberId}/ranking/clicks:
 *   get: 
 *     summary: Obter quantidade de cliques do usuario
 *     tags:
 *       - Subscriptions
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantidade de cliques do usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 * 
 * @swagger
 * /ranking:
 *   get: 
 *     summary: Obter ranking
 *     tags:
 *       - Subscriptions
 *     responses:
 *       200:
 *         description: Ranking
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                     format: email
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   score:
 *                     type: number
 * */