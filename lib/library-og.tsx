import { ImageResponse } from 'next/og';

export function libraryOg(title: string, subtitle: string, label = 'Reading guide') {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a0a0b', color: '#f4f4f5', padding: '64px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '76%', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', fontSize: 23, color: '#a7f3d0' }}>FrankX / The Library</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 20, color: '#a7f3d0', marginBottom: 20 }}>{label}</div>
          <div style={{ display: 'flex', fontSize: title.length > 75 ? 44 : 60, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.6px' }}>{title}</div>
          <div style={{ display: 'flex', fontSize: 25, color: '#cbd5d1', marginTop: 24, lineHeight: 1.4 }}>{subtitle}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 18, color: '#a1a1aa' }}>frankx.ai/library</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', width: '24%', gap: 12, paddingLeft: 32 }}>
        {[{ h: 330, c: '#154a41' }, { h: 400, c: '#267666' }, { h: 360, c: '#3a9984' }].map((book, index) => <div key={index} style={{ display: 'flex', width: 46, height: book.h, borderRadius: 5, background: book.c, borderLeft: '2px solid #80c9b9' }} />)}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
