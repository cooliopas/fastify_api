import { Type } from "@sinclair/typebox";

export const HealthcheckSuccessSchema = Type.Object({
    timestamp: Type.String(),
})