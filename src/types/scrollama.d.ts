declare module "scrollama" {
  interface ScrollamaInstance {
    setup: (options: ScrollamaOptions) => ScrollamaInstance;
    onStepEnter: (
      callback: (response: StepResponse) => void
    ) => ScrollamaInstance;
    onStepExit: (
      callback: (response: StepResponse) => void
    ) => ScrollamaInstance;
    onStepProgress: (
      callback: (response: StepProgressResponse) => void
    ) => ScrollamaInstance;
    resize: () => ScrollamaInstance;
    enable: () => ScrollamaInstance;
    disable: () => ScrollamaInstance;
    destroy: () => void;
    offsetTrigger: () => number;
  }

  interface ScrollamaOptions {
    step: string;
    container?: string;
    graphic?: string;
    offset?: number;
    progress?: boolean;
    threshold?: number;
    order?: boolean;
    once?: boolean;
    debug?: boolean;
  }

  interface StepResponse {
    element: HTMLElement;
    index: number;
    direction: "up" | "down";
  }

  interface StepProgressResponse extends StepResponse {
    progress: number;
  }

  function scrollama(): ScrollamaInstance;
  export default scrollama;
}
