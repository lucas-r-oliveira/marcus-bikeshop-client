export type Action = {
	text: string;
	action: () => unknown;
	btnColor?: string
}