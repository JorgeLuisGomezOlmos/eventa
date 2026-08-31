interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

function StepProgress({
  currentStep,
  totalSteps,
}: StepProgressProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {Array.from(
          { length: totalSteps },
          (_, index) => {
            const step = index + 1;
            const isActive = step <= currentStep;

            return (
              <div
                key={step}
                className="flex flex-1 items-center"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-zinc-200 text-zinc-500"
                  }`}
                >
                  {step}
                </div>

                {step !== totalSteps && (
                  <div
                    className={`h-1 flex-1 ${
                      step < currentStep
                        ? "bg-primary"
                        : "bg-zinc-200"
                    }`}
                  />
                )}
              </div>
            );
          }
        )}
      </div>

      <div className="mt-4 flex justify-between text-xs font-medium text-zinc-500">
        <span>Evento</span>
        <span>Invitados</span>
        <span>Detalles</span>
        <span>Preferencias</span>
      </div>
    </div>
  );
}

export default StepProgress;