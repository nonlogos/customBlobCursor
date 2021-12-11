import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap-trial';

import { ICursor } from './cursor.types';
import { StyledCursor } from './cursor.styles';
import { useTicker } from '../../customHooks/gsapHooks';
import { useBlob, useBlobAsCircle } from '../../customHooks/blobAnimation';
import { useSquishyEffect } from '../../customHooks/squishyAnimation';

const Cursor = ({ stickyPos, cursorSize = 80 }: ICursor) => {
	const el = useRef(null);
	const svgPath = useRef<SVGPathElement>(null);

	// initialize blobPath
	const setCircle = useBlobAsCircle(svgPath, 6, cursorSize);
	const animateBlobPath = useBlob(svgPath);
	const { AnimateSquishyLoop, setFromEvent } = useSquishyEffect(el);

	const { left, top, width, height, isSticky } = stickyPos;

	// set GSAP quick setter values on loop function
	useLayoutEffect(() => {
		setCircle();
		gsap.set(svgPath.current, {
			attr: {
				fill: 'transparent',
				stroke: 'hsl(300 100% 50%)',
				strokeWidth: 2,
			},
		});
	}, []);

	useTicker(() => AnimateSquishyLoop(cursorSize));

	// set up custom cursor following mouse move
	// useLayoutEffect(() => {
	//   console.log("isSticky", isSticky);
	//   // need to change to pointermove
	//   window.addEventListener("mousemove", setFromEvent);
	//   return () => window.removeEventListener("mousemove", setFromEvent);
	// }, []);

	useEffect(() => {
		if (isSticky) {
			if (left && top && width && height) {
				gsap.ticker.remove(AnimateSquishyLoop);
				console.log('widith', width);
				gsap.to(el.current, {
					x: left + width / 2,
					y: top + height / 2,
					scale: 1 + width / 100,
					duration: 0,
				});
				gsap.to(svgPath.current, {
					attr: {
						fill: 'hsl(300 100% 50%)',
						stroke: 'transparent',
						duration: 0,
					},
				});
				// gsap.ticker.add(animateBlobPath);
			}
		} else {
			gsap.killTweensOf('*');
			gsap.ticker.remove(animateBlobPath);
			setCircle();
			gsap.to(el.current, {
				scale: 1,
				duration: 0.1,
			});
			gsap.to(svgPath.current, {
				attr: {
					fill: 'transparent',
					stroke: 'hsl(300 100% 50%)',
					duration: 0,
				},
			});
			gsap.ticker.add(() => AnimateSquishyLoop(cursorSize));
		}
	}, [isSticky]);

	return (
		<StyledCursor size={isSticky ? width : cursorSize} ref={el}>
			<svg id="cursor" viewBox="0 0 200 200">
				<path id="blob" ref={svgPath} d=""></path>
			</svg>
		</StyledCursor>
	);
};

export default Cursor;
