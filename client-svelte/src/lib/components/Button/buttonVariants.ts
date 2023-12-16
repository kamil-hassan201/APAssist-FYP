import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-content hover:bg-primary-focus rounded-full',
				destructive: 'bg-error text-white hover:bg-error-focus rounded-full',
				affirmative: 'bg-affirmative text-affirmative-foreground hover:bg-affirmative/90',
				outline: 'border border-primary hover:bg-accent/40',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				'accent-2': 'bg-accent-2 text-accent-2-content hover:bg-accent-2-focus rounded-full',
				ghost:
					'hover:bg-black/25 data-dark:hover:bg-white/25 hover:text-accent-foreground rounded-full',
				underline: 'bg-transparent hover:underline'
			},
			size: {
				default: 'h-10 py-2 px-4',
				sm: 'h-9 px-3',
				lg: 'h-11 px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);
