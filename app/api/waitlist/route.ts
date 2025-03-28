import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }
    
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);
    
    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'Este email ya está en nuestra lista de espera' },
          { status: 200 }
        );
      }
      
      console.error('Error al guardar email:', error);
      return NextResponse.json(
        { error: 'Error al guardar el email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: '¡Te has unido a nuestra lista de espera!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}