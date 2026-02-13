import { Sandbox } from "@e2b/code-interpreter";
import { db, Prisma } from "@repo/database";

export async function createSandbox(projectId: string) {
    let sandbox: Sandbox | null = null;
    let isNewSandbox = false;

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        },
    });

    if (!project) {
        throw new Error("Project not found")
    }

    if (project.sandboxId) {
        try {
            sandbox = await Sandbox.connect(project.sandboxId);
            console.log("Connected to exisiting sandbox:", project.sandboxId)
        } catch (error){
            console.log("Failed to connect to exisiting sandbox, creating a new one", error)
        }
    }

    if (!sandbox) {
        sandbox = await Sandbox.create("plutolab-react-base")
        project.sandboxId = sandbox.sandboxId;

        await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                sandboxId: sandbox.sandboxId
            },
        });
        isNewSandbox = true;
    }

    return sandbox;
}