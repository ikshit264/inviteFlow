const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Testing connection...')
        await prisma.$connect()
        console.log('Connection successful!')

        const planCount = await prisma.plan.count()
        console.log('Plan count:', planCount)

        const eventCount = await prisma.event.count()
        console.log('Event count:', eventCount)

        const events = await prisma.event.findMany({
            include: {
                _count: {
                    select: { guests: true }
                }
            }
        })
        console.log('Found events:', events.length)

    } catch (e) {
        console.error('Operation failed:')
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
