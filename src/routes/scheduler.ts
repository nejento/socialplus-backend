import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {PostScheduler} from '../social/PostScheduler';
import { prisma } from '../utils/prisma';


// Deklaruje instanci scheduleru (bude předána z hlavního serveru)
let postScheduler: PostScheduler;

// Schémata pro API dokumentaci
const schedulerStatusSchema = {
  type: 'object',
  properties: {
    isRunning: { type: 'boolean' },
    checkIntervalMinutes: { type: 'number' },
    nextCheck: { type: 'string', format: 'date-time', nullable: true }
  }
};

const upcomingPostSchema = {
  type: 'object',
  properties: {
    postId: { type: 'number' },
    networkId: { type: 'number' },
    contentId: { type: 'number' },
    content: { type: 'string' },
    attachments: { type: 'array', items: { type: 'string' } },
    scheduledDate: { type: 'string', format: 'date-time' },
    networkType: { type: 'string' }
  }
};

/**
 * API endpointy pro správu a monitoring automatického scheduleru příspěvků
 * @param fastify - Instance Fastify serveru
 */
export default async function schedulerRoutes(fastify: FastifyInstance) {

  // Inicializuje referenci na scheduler
  postScheduler = new PostScheduler(prisma, parseInt(process.env.SCHEDULER_CHECK_INTERVAL || "1"));

  /**
   * Získá aktuální stav scheduleru
   * @route GET /scheduler/status
   * @returns Informace o běhu scheduleru (zda běží, interval kontroly, další kontrola)
   */
  fastify.get('/scheduler/status', {
    schema: {
      tags: ['scheduler'],
      description: 'Získání aktuálního stavu scheduleru příspěvků',
      response: {
        200: schedulerStatusSchema
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        return postScheduler.getStatus();
    } catch (error) {
      reply.code(500).send({ error: 'Failed to get scheduler status' });
    }
  });

  /**
   * Spustí manuální kontrolu naplánovaných příspěvků
   * @route POST /scheduler/check
   * @returns Potvrzení o provedení manuální kontroly
   */
  fastify.post('/scheduler/check', {
    schema: {
      tags: ['scheduler'],
      description: 'Manuální spuštění kontroly naplánovaných příspěvků',
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await postScheduler.manualCheck();
      return { message: 'Manual check completed' };
    } catch (error) {
      reply.code(500).send({ error: 'Failed to perform manual check' });
    }
  });

  /**
   * Získá seznam nadcházejících naplánovaných příspěvků
   * @route GET /scheduler/upcoming
   * @param request.query.hours - Počet hodin do budoucna (výchozí 24)
   * @returns Seznam příspěvků naplánovaných k publikování v zadaném časovém období
   */
  fastify.get<{
    Querystring: { hours?: number }
  }>('/scheduler/upcoming', {
    schema: {
      tags: ['scheduler'],
      description: 'Získání nadcházejících naplánovaných příspěvků',
      querystring: {
        type: 'object',
        properties: {
          hours: { type: 'number', minimum: 1, maximum: 168, default: 24 }
        }
      },
      response: {
        200: {
          type: 'array',
          items: upcomingPostSchema
        }
      }
    }
  }, async (request: FastifyRequest<{
    Querystring: { hours?: number }
  }>, reply: FastifyReply) => {
    try {
      const hours = request.query.hours || 24;
        return await postScheduler.getUpcomingPosts(hours);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to get upcoming posts' });
    }
  });

  // Nastaví globální referenci na scheduler pro použití v jiných částech aplikace
  fastify.decorate('postScheduler', postScheduler);
}
