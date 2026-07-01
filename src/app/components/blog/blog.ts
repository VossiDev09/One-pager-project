import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Post } from '../../models/content';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.html',
  styleUrl: './blog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog implements OnDestroy {
  readonly posts = input.required<readonly Post[]>();

  private readonly step = 3;
  private readonly lessButtonExitDurationMs = 260;
  private readonly postExitDurationMs = 550;
  private readonly containerResizeDurationMs = 620;
  private resizeMeasurementFrameId: number | null = null;
  private resizeCleanupTimerId: number | null = null;
  private resizeTransitionHandler: ((event: TransitionEvent) => void) | null = null;
  private lessButtonExitTimerId: number | null = null;
  private postExitTimerId: number | null = null;
  private readonly postsContainerRef = viewChild<ElementRef<HTMLDivElement>>('postsContainer');

  protected readonly visibleCount = signal(this.step);
  protected readonly isHidingLessButton = signal(false);
  protected readonly exitingFromIndex = signal<number | null>(null);

  protected readonly displayedPosts = computed(() =>
    this.posts().slice(0, this.visibleCount())
  );

  protected readonly hasMorePosts = computed(
    () => this.visibleCount() < this.posts().length
  );

  protected readonly canShowLessPosts = computed(
    () => this.visibleCount() > this.step
  );

  protected readonly shouldRenderLessButton = computed(
    () => this.canShowLessPosts() || this.isHidingLessButton()
  );

  protected showMore(): void {
    this.cancelPostExitAnimation();
    this.cancelLessButtonExit();

    this.animateContainerResize(() => {
      this.visibleCount.update((count) =>
        Math.min(count + this.step, this.posts().length)
      );
    });
  }

  protected showLess(): void {
    const currentCount = this.visibleCount();
    const nextCount = Math.max(currentCount - this.step, this.step);

    if (nextCount === currentCount || this.exitingFromIndex() !== null) {
      return;
    }

    this.exitingFromIndex.set(nextCount);

    if (this.postExitTimerId !== null) {
      window.clearTimeout(this.postExitTimerId);
    }

    this.postExitTimerId = window.setTimeout(() => {
      this.exitingFromIndex.set(null);
      this.postExitTimerId = null;

      this.animateContainerResize(() => {
        this.visibleCount.set(nextCount);

        if (nextCount === this.step) {
          this.startLessButtonExit();
        }
      });
    }, this.postExitDurationMs);
  }

  protected isPostExiting(index: number): boolean {
    const exitStartIndex = this.exitingFromIndex();
    return exitStartIndex !== null && index >= exitStartIndex;
  }

  private animateContainerResize(updateVisiblePosts: () => void): void {
    const container = this.postsContainerRef()?.nativeElement;

    if (!container) {
      updateVisiblePosts();
      return;
    }

    const startHeight = container.getBoundingClientRect().height;

    updateVisiblePosts();

    if (this.resizeMeasurementFrameId !== null) {
      cancelAnimationFrame(this.resizeMeasurementFrameId);
      this.resizeMeasurementFrameId = null;
    }

    this.resetContainerResizeState(container);

    this.resizeMeasurementFrameId = requestAnimationFrame(() => {
      this.resizeMeasurementFrameId = requestAnimationFrame(() => {
        this.resizeMeasurementFrameId = null;
        const endHeight = container.scrollHeight;

        if (Math.abs(endHeight - startHeight) < 1) {
          this.resetContainerResizeState(container);
          return;
        }

        container.style.overflow = 'hidden';
        container.style.height = `${startHeight}px`;
        container.style.transition = `height ${this.containerResizeDurationMs}ms cubic-bezier(0.2, 0.75, 0.25, 1)`;

        void container.offsetHeight;

        let cleanedUp = false;
        const finishResize = (): void => {
          if (cleanedUp) {
            return;
          }

          cleanedUp = true;
          this.resetContainerResizeState(container);
        };

        this.clearResizeTransitionHandler(container);
        this.resizeTransitionHandler = (event: TransitionEvent) => {
          if (event.propertyName !== 'height') {
            return;
          }

          finishResize();
        };
        container.addEventListener('transitionend', this.resizeTransitionHandler);

        if (this.resizeCleanupTimerId !== null) {
          window.clearTimeout(this.resizeCleanupTimerId);
        }
        this.resizeCleanupTimerId = window.setTimeout(
          finishResize,
          this.containerResizeDurationMs + 80
        );

        container.style.height = `${endHeight}px`;
      });
    });
  }

  private resetContainerResizeState(container: HTMLDivElement): void {
    this.clearResizeTransitionHandler(container);

    if (this.resizeCleanupTimerId !== null) {
      window.clearTimeout(this.resizeCleanupTimerId);
      this.resizeCleanupTimerId = null;
    }

    container.style.removeProperty('height');
    container.style.removeProperty('overflow');
    container.style.removeProperty('transition');
  }

  private clearResizeTransitionHandler(container: HTMLDivElement): void {
    if (!this.resizeTransitionHandler) {
      return;
    }

    container.removeEventListener('transitionend', this.resizeTransitionHandler);
    this.resizeTransitionHandler = null;
  }

  private startLessButtonExit(): void {
    this.isHidingLessButton.set(true);

    if (this.lessButtonExitTimerId !== null) {
      window.clearTimeout(this.lessButtonExitTimerId);
    }

    this.lessButtonExitTimerId = window.setTimeout(() => {
      this.isHidingLessButton.set(false);
      this.lessButtonExitTimerId = null;
    }, this.lessButtonExitDurationMs);
  }

  private cancelLessButtonExit(): void {
    if (this.lessButtonExitTimerId !== null) {
      window.clearTimeout(this.lessButtonExitTimerId);
      this.lessButtonExitTimerId = null;
    }

    this.isHidingLessButton.set(false);
  }

  private cancelPostExitAnimation(): void {
    if (this.postExitTimerId !== null) {
      window.clearTimeout(this.postExitTimerId);
      this.postExitTimerId = null;
    }

    this.exitingFromIndex.set(null);
  }

  ngOnDestroy(): void {
    if (this.resizeMeasurementFrameId !== null) {
      cancelAnimationFrame(this.resizeMeasurementFrameId);
    }

    const container = this.postsContainerRef()?.nativeElement;
    if (container) {
      this.resetContainerResizeState(container);
    } else if (this.resizeCleanupTimerId !== null) {
      window.clearTimeout(this.resizeCleanupTimerId);
      this.resizeCleanupTimerId = null;
    }

    if (this.lessButtonExitTimerId !== null) {
      window.clearTimeout(this.lessButtonExitTimerId);
    }

    if (this.postExitTimerId !== null) {
      window.clearTimeout(this.postExitTimerId);
    }
  }
}
