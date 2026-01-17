import { useState, useEffect, useCallback, useRef } from 'react';

export type WorkflowStep = {
    id: string;
    onNext?: () => boolean | Promise<boolean>;
    onEnter?: () => void;
    onExit?: () => void;
    optional?: boolean;
}

export type UseWorkflowOptions = {
    initialStep?: number;
    onFinish?: () => void
}

export type UseWorkflowReturn = {
    step: number;
    stepId: string;
    steps: WorkflowStep[];

    isFirst: boolean;
    isLast: boolean;

    canNext: boolean;
    canBack: boolean;

    next: () => Promise<void>;
    back: () => void;
    goTo: (step: number | string) => void
    reset: () => void;
}

export function useWorkflow(
    steps: WorkflowStep[],
    options: UseWorkflowOptions = {}
) : UseWorkflowReturn {
    const { initialStep = 0, onFinish } = options;

    const [step, setStep] = useState(initialStep);
    const isTransitioning = useRef(false);

    const currentStep = steps[step];

    useEffect(()=>{
        currentStep?.onEnter?.();

        return () => {
            currentStep?.onExit?.();
        }
    },[step]);

    const canBack = step > 0;
    const canNext = step < steps.length - 1;

    const next = useCallback(async () => {
        if(isTransitioning.current) return;
        if(!currentStep) return;

        isTransitioning.current = true;

        try{
            if(currentStep.onNext){
                const result = await currentStep.onNext();
                if(result===false) return;
            }

            if(step === steps.length - 1){
                onFinish?.();
                return;
            }
        }catch(error){
            console.error('Workflow error:', error);
        }finally{
            isTransitioning.current = false;
        }
    },[step, steps.length, currentStep, onFinish]);

    const back = useCallback(() => {
        if (!canBack) return
        setStep((s: number) => Math.max(s - 1, 0))
    }, [canBack])

    const goTo = useCallback(
        (target: number | string) => {
        if (typeof target === 'number') {
            if (target < 0 || target >= steps.length) return
            setStep(target)
            return
        }

        const index = steps.findIndex((s) => s.id === target)
        if (index !== -1) setStep(index)
        },
        [steps]
    )

    const reset = useCallback(() => {
        setStep(initialStep)
    }, [initialStep])

    return {
        step,
        stepId: currentStep?.id ?? '',
        steps,

        isFirst: step === 0,
        isLast: step === steps.length - 1,

        canNext,
        canBack,

        next,
        back,
        goTo,
        reset
    }
}